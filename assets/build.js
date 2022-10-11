$(document).ready(function () {
 
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
    let idToUpdate = $(this).attr("data-variant")
    let updateQty = $(`.wrapper-items-for-box .qty-variant-${idToUpdate}`).text()
        updateQty = parseInt(updateQty)
        updateQty = updateQty + 1
    if(updateQty > 0){
      $(`.qty-variant-${idToUpdate}`).siblings(".less").removeClass("disabled")
    }
    $(`.qty-variant-${idToUpdate}`).text(updateQty)

    /* UPDATE TOTAL IN YOUR BOX */
    let sizeBoxSmall = 12
    let sizeBoxBig = 24
    let totalInYourBox = $(".in-your-box .curr-added").text()
        totalInYourBox = parseInt(totalInYourBox)
        totalInYourBox = totalInYourBox + 1
    $(".in-your-box .curr-added").text(totalInYourBox)

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

    if(checkContentItemsInBox == ''){
      $(".items-added").append(`
        <div class="item item-${idProduct}" data-title-prod="${titleProduct}" data-prod-id="${idProduct}" data-variant-id="${getIdVariant}">
          <div class="header-item">${titleProduct}</div>
          <div class="content" data-variant-id="${getIdVariant}">
            <p>${getTitleVariant}</p>
            <div class="selected-qty">
              <span class="less" data-variant="${getIdVariant}" data-product="${idProduct}">-</span>
              <span class="qty qty-variant-${getIdVariant}">${updateQty}</span>
              <span class="more" data-variant="${getIdVariant}">+</span>      
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
                  <span class="more" data-variant="${getIdVariant}">+</span>      
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
                  <span class="more" data-variant="${getIdVariant}">+</span>      
              </div>
            </div>
          </div>
        `)
      }
    }
  });

  /* LESS ITEMS */
  $(document).on("click", ".selected-qty .less", function () {
    let idToUpdate = $(this).attr("data-variant")    
    let updateQty = $(`.wrapper-items-for-box .qty-variant-${idToUpdate}`).text()      
        updateQty = parseInt(updateQty)
        updateQty = updateQty - 1        
      $(`.qty-variant-${idToUpdate}`).text(updateQty)
      

        /* UPDATE TOTAL IN YOUR BOX */        
        let sizeBoxBig = 24
        let totalInYourBox = $(".in-your-box .curr-added").text()
        totalInYourBox = parseInt(totalInYourBox)
        totalInYourBox = totalInYourBox - 1
        $(".in-your-box .curr-added").text(totalInYourBox)
        if(totalInYourBox < sizeBoxBig){         
        $(".selected-qty .more").removeClass("disabled")
      }

      let idProduct = $(this).attr("data-product")
      console.log(idProduct)
      if(updateQty < 1){
        $(`.qty-variant-${idToUpdate}`).siblings(".less").addClass("disabled")
        $(`.items-added  .content[data-variant-id="${idToUpdate}"]`).remove()
        if ( !$(`.items-added .item-${idProduct} .content`).length > 0 ) {
          $(`.items-added .item-${idProduct}`).remove()
          console.log("ya no hay")
        }
      }
     
  });

  /* SELECT SIZE BOX */
  $(document).on("click", ".select-box > div", function () {
    $(".select-box > div").removeClass("active");
    $(this).addClass("active");
    let sizeBox = $(this).attr("data-size-box");
    let itemsAdd = $(".header-your-box .curr-added").text()
      itemsAdd = parseInt(itemsAdd)
      $(".header-your-box .size-box").html(sizeBox);
      
      if(itemsAdd > sizeBox){
        $(".select-box > div[data-val='24']").trigger("click")
      }
      
  });

  /* BUTTON RESET */
  $(document).on("click", "#reset-box", function () {
    $(".in-your-box .curr-added").html("0")
    $(".items-added ").empty()
    $(".selected-qty .qty").html(0)
    $(".select-box div[data-size-box='12']").trigger("click")
  });

  /* BUTTON ADD TO CART */
  $(document).on("click", "#addToCartBox", function () {
    let sizeBoxAdd = $(".select-box > div.active").attr("data-size-box")
    
    let addBox = {
         "items" : []
      }

    $( ".items-added .item .content" ).each(function( index ) {       
        let idVariant = $(this).attr("data-variant-id")
        let qty = $(this).find(".qty").text()
        let newItem = {
          "id" : idVariant,  
          'quantity': qty
        }
        addBox.items.push(newItem)        
      });

      console.log(addBox)

      let formData = {
       'items': [{
        'id': 40864743817275,
        'quantity': 2
        }]
      };
      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addBox)
      })
      .then((response) => response.json())
      .then((data) => console.log(data));
      

  });

});
