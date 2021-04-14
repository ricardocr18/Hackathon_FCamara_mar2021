export default function idade(data) {
  var hoje = new Date();
  var dataNascimento = new Date(data);
  var idade = hoje.getFullYear() - dataNascimento.getFullYear();
  var m = hoje.getMonth() - dataNascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
  }
  return idade;
}
