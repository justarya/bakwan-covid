export default {
  methods: {
    catchHandler(err) {
      const errorMessage = err.response.data.message.join(', ');
      this.$swal.fire(
        'Oops...',
        errorMessage,
        'error',
      );
    },
    errorHandler(err) {
      const errorMessage = err;
      this.$swal.fire(
        'Oops...',
        errorMessage,
        'error',
      );
    },
    successHandler(message, title = 'Sukses!') {
      this.$swal.fire(
        title,
        message,
        'success',
      );
    },
    askDelete(param = {}) {
      return new Promise((resolve) => {
        this.$swal.fire({
          title: param.title || 'Hapus?',
          text: param.message || 'Anda tidak akan dapat mengembalikan ini!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: param.confirmButtonText || 'Ya, hapus!',
          cancelButtonText: param.cancelButtonText || 'Batal',
        }).then((result) => {
          if (result.value) {
            resolve();
          }
        });
      });
    },
  },
};
