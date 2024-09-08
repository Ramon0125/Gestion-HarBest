import Swal from "sweetalert2";

export function IsntEmpty(...values)
{
    return values.every( value => value.trim().length > 0) 
}

export function Alert(result, icon, tim = false, tit = false, sc = false)
{
	Swal.fire({
		confirmButtonColor: '#28a745',
		showConfirmButton: sc,
		icon: icon,
		title: tit,
		text: result,
		timer: tim
	});
}

export const Res = {
W: 'warning',
S: 'success',
E: 'error',
CTC: 'Complete todos los campos',
}
