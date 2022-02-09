const labels = document.querySelectorAll('.form-control label');

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split('')
    .map(
      (letter, i) =>
        `<span style="transition-delay:${i * 80}ms">${letter}</span>`
    )
    .join('');
});
