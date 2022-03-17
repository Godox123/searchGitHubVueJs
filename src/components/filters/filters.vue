<template>
  <div class="filters">
    <input
      class="filters__input"
      placeholder="Введите имя пользователя"
      v-model="currentValue"
    />

    <label class="filters__label">
      <input type="checkbox" v-model="isDescending" />
      <div class="filters__descr">Сортировать по убыванию</div>
    </label>
  </div>
</template>

<script>
export default {
  name: "SearchInput",

  props: ["loading"],

  data() {
    return {
      currentValue: "",
      isDescending: false,
      timer: "",
    };
  },

  created() {
    this.$watch(
      () => this.currentValue,
      (newVal) => {
        this.$store.dispatch({ type: "searchValueAction", text: newVal });

        clearTimeout(this.timer);

        !this.loading && this.$emit("update:loading", true);

        this.timer = setTimeout(() => {
          this.$store.dispatch("usersAction");
          this.$emit("update:loading", false);
        }, 1000);
      }
    );

    this.$watch(
      () => this.isDescending,
      (newVal) => {
        this.$store.dispatch({
          type: "orderAction",
          value: newVal ? "asc" : "desc",
        });

        this.$store.dispatch("usersAction");
      }
    );
  },
};
</script>

<style>
.filters {
  display: flex;
  margin: 0 0 40px 0;
}

.filters__input {
  width: 500px;
  margin: auto;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 0 40px 0 15px;
  font: 500 16px/40px "sf pro display";
  transition: border 0.4s;
  margin: 0 15px 0 0;
}

.filters__input::placeholder {
  color: rgb(190, 190, 190);
}

.filters__input:focus,
.filters__input:hover {
  border-color: cadetblue;
}

.filters__label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.filters__label > input {
  margin: 0 10px 0 0;
}

.filters__descr {
  font: 400 14px/20px "sf pro display";
}
</style>
