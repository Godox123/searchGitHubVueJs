<template>
  <div
    @click="toggle()"
    :class="{ 'users__item--active': isVisible }"
    class="users__item"
  >
    <div class="users__img-wrap">
      <img class="users__img" :src="user.avatar_url" alt="avatar" />
    </div>
    <div class="users__wrap">
      <div class="users__text"><span>Login:</span> {{ user.login }}</div>
      <div class="users__text"><span>Type:</span> {{ user.type }}</div>
    </div>

    <div v-if="isVisible" class="users__addInf">
      <div class="users__text"><span>Node_id:</span>{{ user.node_id }}</div>
      <div class="users__text">
        <span>Site_admin</span>{{ user.site_admin }}
      </div>
      <div class="users__text"><span>id</span>{{ user.id }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: ["user"],
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style>
.users__item {
  position: relative;
  display: flex;
  height: 100px;
  border-radius: 8px;
  margin: 0 0 20px 0;
  font: 400 18px/20px "arial";
  background: #fff;
  box-shadow: 0 0 22px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: border 0.4s, height 0.4s;
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 20px;
  overflow: hidden;
}

.users__item:hover {
  border: 1px solid lightgreen;
}

.users__item--active {
  height: 205px;
}

.users__wrap {
  padding: 5px 0 0 0;
}

.users__img-wrap {
  position: relative;
  width: 60px;
  height: 0;
  padding: 0 0 60px 0;
  margin: 0 20px 0 0;
}

.users__img {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.users__text {
  margin: 0 0 10px 0;
}

.users__text:last-child {
  margin-bottom: 0;
}

.users__text > span {
  font-weight: 600;
  letter-spacing: 0.05em;
}

.message {
  font: 500 16px/19px "arial";
}

.users__addInf {
  position: absolute;
  top: 105px;
}
</style>
