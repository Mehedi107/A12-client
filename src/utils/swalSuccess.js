import Swal from 'sweetalert2';

export const swalSuccess = title => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1000,
  });
};
