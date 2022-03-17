<template>
  <div class="notFound">
    Такой страницы не существует!<br />
    редирект обратно через: {{ timer }}
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      timer: 5,
    };
  },

  mounted() {
    setInterval(() => {
      this.timer--;
      !this.timer && this.$router.push("/");
    }, 1000);
  },
};
</script>

<style>
.notFound {
  width: 100%;
  height: 100vh;
  font: 500 30px/30px "sf pro display";
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
