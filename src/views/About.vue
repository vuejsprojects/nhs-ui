<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="i in 10" :key="i">
      {{i}}ssss {{$store.getters.numRowFieldToDisplay}}
    </div>
  </div>
</template>
