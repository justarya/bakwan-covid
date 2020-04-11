<template>
  <ACard color="blue" class="o-sidebar --auth">
    <i class="o-sidebar__avatar material-icons">account_circle</i>
    <div class="o-sidebar__user">
      <p class="--label text-base">{{ username }}</p>
      <a
        class="--link text-sm"
        @click="logout"
      >
        Keluar
      </a>
    </div>
  </ACard>
</template>

<script>
import ACard from '@/components/atoms/ACard';

export default {
  name: 'SidebarUser',
  components: {
    ACard,
  },
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  methods: {
    logout() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
.o-sidebar {
  margin-bottom: 15px;
  &.--auth {
    padding: 15px;
    display: flex;
  }
  &__user {
    margin-left: 10px;
    .--label {
      line-height: 1;
    }
    .--link {
      cursor: pointer;
      color: $blue;
    }
  }
  &__avatar {
    font-size: 30px;
  }
}
</style>
