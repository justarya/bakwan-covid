<template>
  <div class="p-hospital">
    <MemberTemplate
      :sidebar="config.sidebar"
    >
      <router-view></router-view>
    </MemberTemplate>
  </div>
</template>

<script>
import MemberTemplate from '@/components/templates/MemberTemplate';

export default {
  name: 'Hospital',
  components: {
    MemberTemplate,
  },
  data: () => ({
    config: {
      sidebar: [
        {
          title: 'Rumah Sakit Gatot Subroto',
          menu: [
            {
              label: 'Info',
              url: {
                name: 'HospitalInfo',
                params: {
                  id: 1,
                },
              },
              icon: 'info_outline',
            },
            {
              label: 'Pasokan',
              url: {
                name: 'HospitalSupply',
                params: {
                  id: 1,
                },
              },
              icon: 'all_inbox',
            },
          ],
        },
      ],
    },
  }),
};
</script>
