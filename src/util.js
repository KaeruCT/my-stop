export function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const randUint = (range) => Math.floor(Math.random() * range);

export const delay = (amount) => new Promise(resolve => {
    setTimeout(resolve, amount);
});

export function randomlyPlaceChildren(element, children) {
  const TRIES_PER_BOX = 50;
  
  const placing = children.map((el) => Bounds(el, 50));
  const fitted = [];
  const areaToFit = Bounds(element);
  var maxTries = TRIES_PER_BOX * placing.length;
  while (placing.length && maxTries > 0) {  
    let i = 0;
    while (i < placing.length) {
      const box = placing[i];
      box.moveTo(randUint(areaToFit.w - box.w), randUint(areaToFit.h - box.h));
      if (fitted.every((placed) => !placed.overlaps(box))) {
        const newFitted = placing.splice(i--, 1)[0];
        newFitted.placeElement();
        fitted.push(newFitted);
      } else {
        maxTries--;
      }
      i++;
    }
  }
  function Bounds(el, pad = 0) {
    const box = el.getBoundingClientRect();
    return {
      l: box.left - pad,
      t: box.top - pad,
      r: box.right + pad,
      b: box.bottom + pad,
      w: box.width + pad * 2,
      h: box.height + pad * 2,
      overlaps(bounds) {
        return !(
          this.l > bounds.r ||
          this.r < bounds.l ||
          this.t > bounds.b ||
          this.b < bounds.t
        );
      },
      moveTo(x, y) {
        this.r = (this.l = x) + this.w;
        this.b = (this.t = y) + this.h;
      },
      placeElement() {
        el.style.top = this.t + pad + "px";
        el.style.left = this.l + pad + "px";
      }
    };
  }
}
