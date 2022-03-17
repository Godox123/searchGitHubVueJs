<template>
  <div class="layout__bd">
    <Filters v-model:loading="loading"></Filters>
    <Preloader v-if="loading"></Preloader>

    <div v-if="!loading" class="users">
      <User v-for="user in users" :key="user.id" :user="user"></User>
    </div>

    <i ref="anchor"></i>
  </div>
</template>

<script>
import Filters from "../filters/filters.vue";
import Preloader from "../../common/components/preloader/preloader.vue";
import User from "../user/user.vue";

import { mapState } from "vuex";

export default {
  name: "Main",
  components: {
    Filters,
    Preloader,
    User,
  },

  computed: mapState({
    users: (state) => state.users,
    n: (state) => state.n,
  }),

  data() {
    return {
      loading: false,
    };
  },

  beforeMount() {
    this.$store.dispatch("usersAction");
  },

  mounted() {
    const options = {
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.n < 30) {
        this.$store.dispatch("nAction");
        this.$store.dispatch("usersAction");
      }
    };
    const observer = new IntersectionObserver(callback, options);

    observer.observe(this.$refs["anchor"]);
  },
};
</script>

<style>
.layout__bd {
  min-width: 1200px;
  min-height: 100vh;
  max-width: 1440px;
  margin: auto;
  padding: 95px 221px 0 220px;
}

@media (max-width: 1380px) {
  .layout__bd {
    padding-left: 140px;
    padding-right: 140px;
  }
}
</style>
