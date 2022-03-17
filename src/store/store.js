import { createStore } from "vuex";
import growl from "growl-js";

const store = createStore({
  state() {
    return {
      searchValue: "",
      users: [],
      order: "desc",
      n: 5,
    };
  },
  mutations: {
    nMutation(state) {
      state.n = state.n + 5;
    },

    usersMutation(state, payload) {
      state.users = payload;
    },
    searchValueMutation(state, payload) {
      state.searchValue = payload;
    },
    orderMutation(state, payload) {
      state.order = payload;
    },
  },

  actions: {
    nAction(context) {
      context.commit("nMutation");
    },

    usersAction(context, payload) {
      // Если не указано значение, чтобы избежать ошибки генерирую рандомную пару букв
      if (!context.state.searchValue) {
        const alphabet = "qwertyuiopasdfghjklzxcvbnm";
        let word = "";

        for (let i = 0; i < 2; i++) {
          word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
        }

        context.commit("searchValueMutation", word);
      }

      const req = `https://api.github.com/search/users?sort=repositories&order=${context.state.order}&q=${context.state.searchValue}&per_page=${context.state.n}`;

      fetch(req)
        .then((res) => res.json())
        .then((res) => {
          if (res.documentation_url) {
            growl({
              message:
                "Без авторизации, иногда вылетает ошибка (смотреть во вкладке networks)",
              type: "danger",
              duration: 5,
            });

            console.log(res.documentation_url);
            return;
          }

          context.commit("usersMutation", res.items);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    },

    searchValueAction(context, payload) {
      context.commit("searchValueMutation", payload.text);
    },

    orderAction(context, payload) {
      context.commit("orderMutation", payload.value);
    },
  },
});

export default store;
