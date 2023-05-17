<template>
  <div class="background">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.background {
  display: flex;
  justify-content: center;
  background-image: url(../assets/bg-desktop-light.jpg);
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-position: center top;
  background-repeat: no-repeat;
  background-color: var(--background);

  @media only screen and (max-width: 375px) {
    background-image: url(../assets/bg-mobile-light.jpg);
  }

  .dark-theme & {
    background-image: url(../assets/bg-desktop-dark.jpg);

    @media only screen and (max-width: 375px) {
      background-image: url(../assets/bg-mobile-dark.jpg);
    }
  }
}
</style>
