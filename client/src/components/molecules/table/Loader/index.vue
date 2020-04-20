<template>
  <tbody>
    <tr
      v-for="(item, id) of 10"
      :key="id"
    >
      <td
        v-for="(field, idx) in fieldLength"
        :key="idx"
      >
        <div class="m-table--loader"></div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableLoader',
  props: {
    fieldLength: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style lang="scss">
@-webkit-keyframes linear-loader {
  0% { background-position: -250px 0; }
  100% { background-position: 250px 0; }
}

.m-table--loader {
    height: 12px;
    background: linear-gradient(to right, #F2F4F7 20%, #E2E2E2 50%, #F2F4F7 80%);
    background-size: 500px 100px;
    animation-name: linear-loader;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}

</style>
