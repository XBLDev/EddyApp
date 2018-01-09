var animation = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'Group1Image7BatteriesV3.json'/*data.json works, Group1Image7BatteriesV3.json doesn't*/
  })