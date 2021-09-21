/* eslint-disable comma-dangle */
<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" @money="changeMoney"/>
    </div>
    <section>
      <ol class="data-table__container">
        <li class="container__string string-header">
          <div class="container__attribute" v-for="col in columns" :key="col.name" :style="{width: col.width}">{{col.label}}</div>
        </li>
        <li class="container__string string-list" v-for="li in paginate(rows)" :key="li.id">
          <div class="container__attribute" :data-name="columns[0].label" :style="{width: columns[0].width}">{{li.id}}</div>
          <div class="container__attribute" :data-name="columns[1].label" :style="{width: columns[1].width}">{{formatDate(li.date)}}</div>
          <div class="container__attribute" :data-name="columns[2].label" :style="{width: columns[2].width}">{{li.name}}</div>
          <div class="container__attribute" :data-name="columns[3].label" :style="{width: columns[3].width}">{{li.money.toLocaleString()}}</div>
        </li>
      </ol>
    </section>
    <div class="data-table__paginator">
      <ui-pagination v-model="page" :pages="pageCount" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date).toLocaleString('ru', { day: 'numeric', month: 'numeric', year: 'numeric' });
      return d;
    },
    paginate(rows) {
      const { page } = this;
      const { pageSize } = this;
      const from = (page * pageSize) - pageSize;
      const to = (page * pageSize);
      return rows.slice(from, to);
    },
    changeMoney(event) {
      // eslint-disable-next-line radix
      this.moneyFilter = parseFloat(event);
      this.$store.commit('filterRows', this.moneyFilter);
    },
  },
};
</script>
