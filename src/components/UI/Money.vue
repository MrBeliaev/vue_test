<template>
  <input
    @input="filterRows()"
    type="text"
    v-model="valueInput"
    class="ui-money">
    <!-- onkeyup="value=value.replace(/[^\d]+(\.[\d]+)?/,'')"/> -->
</template>

<script>
export default {

  name: 'UiMoney',

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: '',
    };
  },
  methods: {
    filterRows() {
      this.valueInput = this.valueInput.replace(/[^\d]+(\.[\d]+)?/, '');
      this.$emit('money', this.valueInput);
    },
  },
};
</script>
