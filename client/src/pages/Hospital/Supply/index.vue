<template>
  <div class="p-hospital-supply">
    <div class="p-hospital-supply__title">
      <p>Pasokan</p>
    </div>
    <div class="p-hospital-supply__content">
      <table class="p-hospital-supply__table">
        <thead>
          <tr>
            <th width="500">Nama Barang</th>
            <th width="50">Sisa</th>
            <th width="50">Butuh</th>
            <th width="150" class="--action">
              <AButton
                size="small"
                :border="false"
                :disabled="config.action !== null"
                @click="createRow"
              >
                + Create
              </AButton>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="p-hospital-supply__table--create-row"
            v-if="config.action === -1"
          >
            <td width="500">
              <AInputText
                v-if="config.action === -1"
                v-model="formData.create.name"
              />
            </td>
            <td width="50">
              <AInputText
                v-if="config.action === -1"
                v-model="formData.create.supply"
              />
            </td>
            <td width="50">
              <AInputText
                v-if="config.action === -1"
                v-model="formData.create.demand"
              />
            </td>
            <td width="150" class="--action">
              <template v-if="config.action === -1">
                <AButton
                  :border="false"
                  size="small"
                  @click="saveEditRow(index)"
                >
                  <i class="material-icons">save</i>
                </AButton>
                <AButton
                  :border="false"
                  size="small"
                  @click="cancelEditRow(index)"
                >
                  <i class="material-icons">cancel</i>
                </AButton>
              </template>
            </td>
          </tr>
          <tr
            class="p-hospital-supply__table--row"
            v-for="(data, index) in list"
            :key="index"
          >
            <td width="500">
              <AInputText
                v-if="config.action === index"
                v-model="formData.edit.name"
              />
              <span v-else>
                {{ data.name }}
              </span>
            </td>
            <td width="50">

              <AInputText
                v-if="config.action === index"
                v-model="formData.edit.supply"
              />
              <span v-else>
                {{ data.supply }}
              </span>
            </td>
            <td width="50">

              <AInputText
                v-if="config.action === index"
                v-model="formData.edit.demand"
              />
              <span v-else>
                {{ data.demand }}
              </span>
            </td>
            <td width="150" class="--action">
              <template v-if="config.action === null">
                <AButton
                  :border="false"
                  size="small"
                  @click="editRow(index)"
                >
                  <i class="material-icons">edit</i>
                </AButton>
                <AButton
                  :border="false"
                  size="small"
                  @click="promptDeleteRow(index)"
                >
                  <i class="material-icons">delete</i>
                </AButton>
              </template>
              <template v-if="config.action === index">
                <AButton
                  :border="false"
                  size="small"
                  @click="saveEditRow(index)"
                >
                  <i class="material-icons">save</i>
                </AButton>
                <AButton
                  :border="false"
                  size="small"
                  @click="cancelEditRow(index)"
                >
                  <i class="material-icons">cancel</i>
                </AButton>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AInputText from '@/components/atoms/AInputText';
import AButton from '@/components/atoms/AButton';

export default {
  name: 'HospitalSupply',
  components: {
    AButton,
    AInputText,
  },
  data: () => ({
    config: {
      action: null,
    },
    list: [
      {
        name: 'mask',
        supply: 9,
        demand: 100,
      },
      {
        name: 'mask',
        supply: 9,
        demand: 100,
      },
      {
        name: 'mask',
        supply: 9,
        demand: 100,
      },
    ],
    formData: {
      edit: {
        name: '',
        supply: '',
        demand: '',
      },
      create: {
        name: '',
        supply: '',
        demand: '',
      },
    },
  }),
  methods: {
    editRow(index) {
      this.config.action = index;
      this.formData.edit = {
        name: this.list[index].name,
        supply: this.list[index].supply,
        demand: this.list[index].demand,
      };
    },
    promptDeleteRow() {},
    saveEditRow() {},
    cancelEditRow() {
      this.config.action = null;
    },
    createRow() {
      this.formData.edit = {
        name: '',
        supply: '',
        demand: '',
      };
      this.config.action = -1;
    },
    cancelCreateRow() {
      this.config.action = null;
    },
  },
};
</script>

<style lang="scss">
.p-hospital-supply {
  &__title {
    font-size: 30px;
    margin-bottom: 20px;
  }
  &__table {
    width: 100%;
    thead {
      th {
        text-align: left;
      }
    }
    tr {
      padding: 0;
      height: 45px;
      .a-input {
        margin: 0;
      }
    }
    .--action {
      width: 300px;
      text-align: right;
    }
  }
}
</style>
