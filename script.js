let namev1 = document.getElementById("name");
const userName = namev1[0].toUpperCase() + namev1.slice(1);

const getSelectedSize = () => {
  const selected = document.querySelector('input[name="size"]:checked');
  return selected ? selected.value : null;
};

