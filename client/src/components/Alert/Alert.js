import Swal from "sweetalert2";
import en from "../../lang/en";

const showSuccessMessage = title => {
    Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 5000,
      background: '#D1FAE5'
    }).fire({
      icon: 'success',
      title,
    });
  };
  
const showErrorMessage = title => {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      background: '#FCA5A5'
    }).fire({
      icon: 'error',
      title: title ?? en.GENERAL_ERROR,
    });
};

const waitingMessage = title => {
    Swal.fire({
        title,
        text: en.PLEASE_WAIT,
        didOpen: () => {
            Swal.showLoading()
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
}

const confirmMessage = (title, text, confirmButtonText, handle) => {
    Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F472B6',
        confirmButtonText
    }).then((result) => {
        if(result.value){
            handle();
        }
    })

}

export { showSuccessMessage, showErrorMessage, waitingMessage, confirmMessage };