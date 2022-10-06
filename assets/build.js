$(document).ready(function () {
  $(document).on("click", ".selected-qty .less", function () {
    let qty = $(this).siblings(".qty").text();
    qty = parseInt(qty);
    if (qty > 0) {
      qty = qty - 1;
      $(this).siblings(".qty").text(qty);
    }
  });

  $(document).on("click", ".selected-qty .more", function () {
    let qty = $(this).siblings(".qty").text();
    qty = parseInt(qty);
    qty = qty + 1;
    $(this).siblings(".qty").text(qty);
  });
});
