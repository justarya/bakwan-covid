<template>
  <ACard color="blue" class="o-sidebar --menu">
    <p
      :class="[
        'o-sidebar__title',
        { 'mb-3' : menu.length && title }
      ]"
    >
      {{ title }}
    </p>
    <template
      v-for="(data, index) in menu"
    >
      <router-link
        :to="data.url"
        :key="index"
        class="o-sidebar__link"
      >
        <i class="material-icons">{{ data.icon || '' }}</i>
        <span>
          {{ data.label }}
        </span>
      </router-link>
    </template>
  </ACard>
</template>

<script>
import ACard from '@/components/atoms/ACard';

export default {
  name: 'SidebarMenu',
  components: {
    ACard,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    /**
     * menu props
     * ex:
     * [ { url, icon, label } ]
     */
    menu: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.o-sidebar {
  &.--menu {
    padding: 15px 0;
  }
  &__title {
    padding: 0 15px;
    font-size: 25px;
    line-height: 1.4;
  }
  &__link {
    padding: 5px 15px;
    display: flex;
    align-items: center;
    width: 100%;
    color: $blue;
    .material-icons {
      padding-right: 10px;
    }
    &:hover {
      background-color: $light-blue;
    }
    &.--active {
      background-color: $blue;
      color: white;
    }
  }
}
</style>
