module.exports = {

  name: function(a) {
    var b = a;
    var arr = b.split("_");
    console.log(arr);

    console.log(arr[0]);
    console.log(arr[1]);

    if (arr[0].indexOf('4', 0) | arr[0].indexOf('F', 0)) {
      console.log('YES');
    }
    if (arr[1].indexOf('4', 0) | arr[1].indexOf('F', 0)) {
      console.log('YES');
    }

  }

}
