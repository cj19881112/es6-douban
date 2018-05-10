export default {
  elt: null,

  start () {
    if (null === this.elt) {
      this.elt = document.createElement('div');
      this.elt.className = 'loader';
      document.body.appendChild(this.elt);
    }

    this.elt.style.display = 'block';
  },

  end () {
    this.elt.style.display = 'none';
  }
}