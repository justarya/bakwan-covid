<template>
  <div class="p-hospital">
    <MemberTemplate
      :sidebar="config.sidebar"
    >
      <router-view></router-view>
    </MemberTemplate>
    <MainFooter/>
  </div>
</template>

<script>
import MemberTemplate from '@/components/templates/MemberTemplate';
import swalMixin from '@/mixins/swalMixin';
import MainFooter from '@/components/organisms/MainFooter';

export default {
  name: 'Member',
  mixins: [swalMixin],
  components: {
    MemberTemplate,
    MainFooter,
  },
  data: () => ({
    config: {
      sidebar: [],
      default: {
        hospital: {
          create: [
            {
              title: 'Dashboard',
              menu: [
                {
                  label: 'Buat Rumah Sakit',
                  url: {
                    name: 'HospitalCreate',
                  },
                  icon: 'add',
                },
              ],
            },
          ],
        },
        adminMenu: [
          {
            title: 'Admin Menu',
            menu: [
              {
                label: 'Buat User & RS',
                url: {
                  name: 'AdminCreateUser',
                },
                icon: 'add',
              },
            ],
          },
        ],
      },
    },
  }),
  watch: {
    $route: {
      handler() {
        this.loadPage();
      },
      immediate: true,
    },
  },
  methods: {
    loadPage() {
      if (this.$store.state.user.role === 1) this.setAdminMenu();
      else this.setHospital();
      this.redirectToNearestMenu();
    },
    setAdminMenu() {
      this.config.sidebar = this.config.default.adminMenu;
    },
    setHospital() {
      const sidebar = this.$store.state.user
        .hospitals
        .reduce((curr, val) => [
          ...curr,
          {
            title: val.name,
            menu: this.getDefaultHospitalMenu(val._id),
          },
        ], []);
      if (sidebar.length) {
        this.config.sidebar = sidebar;
      } else {
        this.config.sidebar = this.config.default.hospital.create;
      }
    },
    getDefaultHospitalMenu(id) {
      return [
        {
          label: 'Pasokan',
          url: {
            name: 'HospitalSupply',
            params: {
              id,
            },
          },
          icon: 'all_inbox',
        },
        {
          label: 'Info',
          url: {
            name: 'HospitalInfo',
            params: {
              id,
            },
          },
          icon: 'info_outline',
        },
      ];
    },
    redirectToNearestMenu() {
      const nearestUrl = this.config.sidebar[0].menu[0].url;
      if (
        this.$router.currentRoute.name === 'MemberArea'
      ) {
        this.$router.replace(nearestUrl);
      }
    },
  },
};
</script>
