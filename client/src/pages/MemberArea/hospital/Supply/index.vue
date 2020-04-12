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
                + Buat
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
                type="number"
                min="0"
              />
            </td>
            <td width="50">
              <AInputText
                v-if="config.action === -1"
                v-model="formData.create.demand"
                type="number"
                min="0"
              />
            </td>
            <td width="150" class="--action">
              <template v-if="config.action === -1">
                <AButton
                  :border="false"
                  size="small"
                  @click="saveCreateRow"
                >
                  <i class="material-icons">save</i>
                </AButton>
                <AButton
                  :border="false"
                  size="small"
                  @click="cancelCreateRow"
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
                type="number"
                min="0"
              />
              <span v-else>
                {{ data.supply }}
              </span>
            </td>
            <td width="50">
              <AInputText
                v-if="config.action === index"
                v-model="formData.edit.demand"
                type="number"
                min="0"
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

import swalMixin from '@/mixins/swalMixin';

export default {
  name: 'HospitalSupply',
  mixins: [swalMixin],
  components: {
    AButton,
    AInputText,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    config: {
      action: null,
    },
    list: [],
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
  created() {
    this.fetchSupply();
  },
  methods: {
    fetchSupply() {
      this.$http.get(`/hospital/${this.id}/supplies`)
        .then(({ data }) => {
          this.list = data.map(this.translateDataFromServer);
        })
        .catch(this.catchHandler);
    },
    editRow(index) {
      this.config.action = index;
      this.formData.edit = {
        name: this.list[index].name,
        supply: this.list[index].supply,
        demand: this.list[index].demand,
      };
    },
    saveEditRow(index) {
      const supplyId = this.list[index].id;
      const payload = {
        ...this.formData.edit,
        product_name: this.formData.edit.name,
      };
      this.$http
        .put(`/hospital/${this.id}/supplies/${supplyId}`, payload)
        .then(() => {
          this.successHandler('Ubah pasokan berhasil!');
          this.config.action = null;
          this.list[index] = {
            ...this.list[index],
            ...this.formData.edit,
          };
        })
        .catch(this.catchHandler);
    },
    cancelEditRow() {
      this.config.action = null;
    },
    promptDeleteRow(index) {
      this.askDelete()
        .then(() => {
          this.deleteRow(index);
        });
    },
    deleteRow(index) {
      const supplyId = this.list[index].id;
      this.$http
        .delete(`/hospital/${this.id}/supplies/${supplyId}`)
        .then(() => {
          this.successHandler('Hapus pasokan berhasil!');
          this.list.splice(index, 1);
        })
        .catch(this.catchHandler);
    },
    createRow() {
      this.formData.create = {
        name: '',
        supply: 0,
        demand: 0,
      };
      this.config.action = -1;
    },
    saveCreateRow() {
      const payload = {
        ...this.formData.create,
        product_name: this.formData.create.name,
      };
      this.$http
        .post(`/hospital/${this.id}/supplies/`, payload)
        .then(({ data }) => {
          this.successHandler('Buat pasokan baru berhasil!');
          this.list.push(this.translateDataFromServer(data));
          this.cancelCreateRow();
        })
        .catch(this.catchHandler);
    },
    cancelCreateRow() {
      this.config.action = null;
    },
    translateDataFromServer(val) {
      return {
        ...val,
        id: val._id,
        name: val.product_name,
      };
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
