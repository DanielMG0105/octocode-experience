let saveCarts = {}
$(document).ready(function () {
  leerCookie("idBox")
  /* SELECT SIZE BOX */
  $(document).on("click", ".select-box > div", function () {
    $(".select-box > div").removeClass("active");
    $(this).addClass("active");
    let sizeBox = $(this).attr("data-size-box");
    let itemsAdd = $(".header-your-box .curr-added").text()
      itemsAdd = parseInt(itemsAdd)
      $(".header-your-box .size-box").html(sizeBox);
      
      if(itemsAdd > sizeBox){
        $(".select-box > div[data-size-box='24']").trigger("click")
      }
      
  });
  /* SELECT PRODUCT */
  $(document).on("click", ".items-variants .header-your-box h3", function () {
    $(".items-variants .header-your-box h3").removeClass("active")    
    $(this).addClass("active")
    let showTab = $(this).attr("data-prod-id")
    $(".list-variants").removeClass("active")
    $(`#list-${showTab}`).addClass("active")
  });  
  $(".items-variants .header-your-box h3:first").trigger("click")
  /*  ADD ITEMS */
  $(document).on("click", ".selected-qty .more", function () {
    let inventory = $(this).attr("data-inventory")
    let available = true
    let idToUpdate = $(this).attr("data-variant")
    let price = $(this).parents("li").attr("data-price")
    console.log(price)
    let updateQty = $(`.wrapper-items-for-box .qty-variant-${idToUpdate}`).text()
        updateQty = parseInt(updateQty)

    if(updateQty == inventory){
      alert("pasaste inventario")
      available = false
    }else{
      updateQty = updateQty + 1
    }

    if(updateQty > 0){
      $(`.qty-variant-${idToUpdate}`).siblings(".less").removeClass("disabled")
    }
    $(`.qty-variant-${idToUpdate}`).text(updateQty)

    /* UPDATE TOTAL IN YOUR BOX */
    let sizeBoxSmall = 12
    let sizeBoxBig = 24
    let totalInYourBox = $(".in-your-box .curr-added").text()
        totalInYourBox = parseInt(totalInYourBox)
        if(available){
          totalInYourBox = totalInYourBox + 1
          $(".in-your-box .curr-added").text(totalInYourBox)
        }

    if(totalInYourBox > sizeBoxSmall){
      $(".select-box div[data-size-box='24']").trigger("click")
    }
    if(totalInYourBox >= sizeBoxBig){
      $(".in-your-box .curr-added").text(sizeBoxBig)
      $(".selected-qty .more").addClass("disabled")
    }

    if(totalInYourBox == sizeBoxSmall || totalInYourBox == sizeBoxBig){
      $("#addToCartBox").attr("disabled", false)
    }else{
      $("#addToCartBox").attr("disabled", true)
    }

    /* APPEND IN SECTION YOUR BOX ITEMS */
    let checkContentItemsInBox = $(".items-added").html()
        checkContentItemsInBox = checkContentItemsInBox.trim(checkContentItemsInBox)

    let getTitleVariant = $(this).parents("li").attr("data-title")
    let getIdVariant = $(this).parents("li").attr("data-variant")
    let idProduct = $(this).parents("li").attr("data-product")
    let titleProduct =  $(".header-your-box h3.active").text()
        titleProduct = titleProduct.trim(titleProduct)    
    let checkTitleProd
    appendProducts(inventory,updateQty, checkContentItemsInBox, getTitleVariant, getIdVariant, idProduct, titleProduct, checkTitleProd)

    /* UPDATE PRICE TOTAL */
    let currPrice = $("#price-in-box").html()
      currPrice = parseInt(currPrice)
      price = parseInt(price)
    let updatePrice = currPrice + price
    $("#price-in-box").html(updatePrice)

  });
  /* LESS ITEMS */
  $(document).on("click", ".selected-qty .less", function () {
    let idToUpdate = $(this).attr("data-variant")
    let price = $(this).parents("li").attr("data-price") 
    let updateQty = $(`.wrapper-items-for-box .qty-variant-${idToUpdate}`).text()      
        updateQty = parseInt(updateQty)
        updateQty = updateQty - 1        
      $(`.qty-variant-${idToUpdate}`).text(updateQty)
      

        /* UPDATE TOTAL IN YOUR BOX */
        let sizeBoxSmall = 12
        let sizeBoxBig = 24
        let totalInYourBox = $(".in-your-box .curr-added").text()
        totalInYourBox = parseInt(totalInYourBox)
        totalInYourBox = totalInYourBox - 1
        $(".in-your-box .curr-added").text(totalInYourBox)
        if(totalInYourBox < sizeBoxBig){         
          $(".selected-qty .more").removeClass("disabled")
        }
        if(totalInYourBox == sizeBoxSmall || totalInYourBox == sizeBoxBig){
          $("#addToCartBox").attr("disabled", false)
        }else{
          $("#addToCartBox").attr("disabled", true)
        }

      let idProduct = $(this).attr("data-product")   
      if(updateQty < 1){
        $(`.qty-variant-${idToUpdate}`).siblings(".less").addClass("disabled")
        $(`.items-added  .content[data-variant-id="${idToUpdate}"]`).remove()
        if ( !$(`.items-added .item-${idProduct} .content`).length > 0 ) {
          $(`.items-added .item-${idProduct}`).remove()          
        }
      }
          /* UPDATE PRICE TOTAL */
    let currPrice = $("#price-in-box").html()
    currPrice = parseInt(currPrice)
    price = parseInt(price)
    let updatePrice = currPrice - price

    $("#price-in-box").html(updatePrice)
     
  });
  /* BUTTON RESET */
  $(document).on("click", "#reset-box", function () {
    $(".in-your-box .curr-added").html("0")
    $(".items-added ").empty()
    $(".selected-qty .qty").html(0)
    $(".select-box div[data-size-box='12']").trigger("click")
  });
  /* BUTTON ADD TO CART */
  $(document).on("click", "#addToCartBox", async function () {
    $(this).text("Adding ...")   
    let idExist =  $(this).attr("data-box-updated")    
    let action = $(this).attr("data-value")
    let sizeBoxAdd = $(".select-box > div.active").attr("data-size-box")    
    let addBox = {"items" : []}
    let dt = new Date();
    let id = ""

    if(idExist){
      id = idExist
    }else{
      id = dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();
    }

    $(".items-added .item .content" ).each(function( index ) { 
        let idVariant = $(this).attr("data-variant-id")
        let qty = $(this).find(".qty").text()
        let newItem = {
          "id" : idVariant,  
          'quantity': qty,   
           selling_plan: id+idVariant,
           properties: {
              "boxSize": sizeBoxAdd, 
              "idBox" : id
          }
        }
        addBox.items.push(newItem)          
    });

    if(action == 'update'){
      id = idExist
      await jQuery.post(window.Shopify.routes.root + 'cart/update.js', {
        updates: saveCarts
      })               
      await fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addBox)
      })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/cart';
      });
      
    }else{
      console.log("is new box")
      await fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addBox)
      })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/cart';        
      });
    }
     eliminarCookie("idBox")
  });
/*  REMOVE BOX CART */
  $(document).on("click", ".removeBox", function () {
    let boxRemove = $(this).attr("data-box-remove")
    let itemsDelete = {}
    $(`#box-${boxRemove} .list-box-${boxRemove} li`).each(function( index ) {
      let idVariantRemove = $(this).attr("data-variant") 
      itemsDelete[idVariantRemove] = 0
    });
    jQuery.post(window.Shopify.routes.root + 'cart/update.js', {
      updates: itemsDelete
    });
    setTimeout(function(){
      console.log("remove")
      window.location.href = '/cart';
    },500)  
  });
  /* EDIT BOX CART */
  $(document).on("click", ".editBox", function () {
    let idBox = $(this).attr("data-id-box")   
    crearCookie("idBox", idBox)
    window.location.href = '/collections/build-a-box';
  });
});

/* LOAD PRODUCTS  */
const loadProducts = (idBox) => { 
  let loadCurrAdded = 0  
  let currSizeBox = $(".in-your-box .size-box").text()
      currSizeBox = parseInt(currSizeBox)
  let qty = 0
  let checkContentItemsInBox
  let checkedTitle = ""
  let updatePrice = 0
  let currPrice = 0
    updatePrice = parseInt(updatePrice)
  jQuery.getJSON('/cart.js', function(cart) {
    $.each( cart.items, function( key, value ) {
      checkedTitle = ""
      updatePrice = $("#price-in-box").html()
      updatePrice = parseInt(updatePrice)
      currPrice = parseInt(value.price)
      updatePrice = updatePrice + currPrice


      $("#price-in-box").html(updatePrice)
      
      console.log(value)
      if(value.properties){
        if(value.properties.idBox == idBox){
          checkContentItemsInBox = $(".items-added").html()
          if(checkContentItemsInBox){
            checkContentItemsInBox = checkContentItemsInBox.trim(checkContentItemsInBox)
          }
          $(`span.qty-variant-${value.id}`).html(value.quantity)     
          loadCurrAdded = loadCurrAdded + value.quantity
          saveCarts[value.key] = 0
          qty =  $(`span.qty-variant-${value.id}`).attr("data-inventory")
  
          $( ".items-added .item .header-item" ).each(function( index ){
            checkedTitle = $(this).html()
          });
  
          if(value.quantity > 0){
            $(`.qty-variant-${value.id}`).siblings(".less").removeClass("disabled")
          }
          appendProducts(qty, value.quantity, checkContentItemsInBox, value.variant_title , value.id , value.product_id, value.product_title, checkedTitle)
        }
      }
    });
    $(".in-your-box .curr-added").text(loadCurrAdded)

    if(loadCurrAdded == currSizeBox){
      $("#addToCartBox").attr("disabled", false)
    }
  });
  $("#addToCartBox").attr("data-box-updated", idBox)
  $("#addToCartBox").attr("data-value", "update")
}
/* DELETE COOKIE */
const eliminarCookie = function (key) {  
  console.log("borrando cookie")
  return document.cookie = key + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
/* READ COOKIE */
const leerCookie = async (key) => {
  keyValue = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));  
  if (keyValue) {    
    loadProducts(keyValue[2])
    return keyValue[2];
  }
};
/* CREATE COOKIE */
const crearCookie = (key, value) => {  
  expires = new Date();
  expires.setTime(expires.getTime() + 86400000); // Tiempo de expiración
  cookie = key + "=" + value + ";path=/;expires=" + expires.toUTCString();
  console.log("creando cookie")
  return (document.cookie = cookie);
};

const appendProducts = (inventory, updateQty, checkContentItemsInBox, getTitleVariant, getIdVariant, idProduct, titleProduct, checkTitleProd) => {
  if(checkContentItemsInBox == ''){
    $(".items-added").append(`
      <div class="item item-${idProduct}" data-title-prod="${titleProduct}" data-prod-id="${idProduct}" data-variant-id="${getIdVariant}">
        <div class="header-item">${titleProduct}</div>
        <div class="content" data-variant-id="${getIdVariant}">
          <p>${getTitleVariant}</p>
          <div class="selected-qty">
            <span class="less" data-variant="${getIdVariant}" data-product="${idProduct}">-</span>
            <span class="qty qty-variant-${getIdVariant}">${updateQty}</span>
            <span class="more" data-variant="${getIdVariant}" data-inventory="${inventory}">+</span>      
        </div>
        </div>
      </div>
    `)   
  }else{      
    $( ".items-added .item" ).each(function( index, i ) {
      checkIdProd = $(this).attr("data-prod-id")
      checkTitleProd = $(this).attr("data-title-prod")

      if(checkTitleProd == titleProduct){
        return false
      }
    });

    if(checkTitleProd == titleProduct){
      let checkVariantContent 
      $( ".items-added .item .content" ).each(function( index ){
        checkVariantContent = $(this).attr("data-variant-id")
        if(checkVariantContent == getIdVariant){
          return false
        }
      });
      if(checkVariantContent != getIdVariant){
        $(`.items-added .item-${idProduct}`).append(`
        <div class="content" data-variant-id="${getIdVariant}">
            <p>${getTitleVariant}</p>
            <div class="selected-qty">
                <span class="less" data-variant="${getIdVariant}" data-product="${idProduct}">-</span>
                <span class="qty qty-variant-${getIdVariant}">${updateQty}</span>
                <span class="more" data-variant="${getIdVariant}" data-inventory="${inventory}">+</span>      
            </div>
          </div>
        `)
      }
    }else{
      $(".items-added").append(`
        <div class="item item-${idProduct}" data-title-prod="${titleProduct}" data-prod-id="${idProduct}" data-variant-id="${getIdVariant}">
          <div class="header-item">${titleProduct}</div>
          <div class="content" data-variant-id="${getIdVariant}">
            <p>${getTitleVariant}</p>
            <div class="selected-qty">
                <span class="less" data-variant="${getIdVariant}" data-product="${idProduct}">-</span>
                <span class="qty qty-variant-${getIdVariant}">${updateQty}</span>
                <span class="more" data-variant="${getIdVariant}" data-inventory="${inventory}">+</span>      
            </div>
          </div>
        </div>
      `)
    }
  }
}