<template>
  <div class="preloader__wrap">
    <div class="preloader__spinner"></div>
  </div>
</template>

<script>
export default {
  name: "preloader",
};
</script>

<style>
.preloader__wrap {
  display: flex;
  justify-content: center;
  height: 200px;
  align-items: center;
}

.preloader__spinner {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin: 10px 10px 0 0;
}

.preloader__spinner:before {
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 2px #ccc;
  position: absolute;
  animation: _preloader-spinner 1s infinite linear;
  box-sizing: border-box;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
}

@keyframes _preloader-spinner {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
