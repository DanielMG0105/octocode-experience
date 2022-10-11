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


  let arrProductos = []
  /*  ADD ITEMS */
  $(document).on("click", ".selected-qty .more", function () {
    let idToUpdate = $(this).attr("data-variant")
    let updateQty = $(`.qty-variant-${idToUpdate}`).text()
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

    /* APPEND IN SECTION YOUR BOX ITEMS */
    let checkContentItemsInBox = $(".items-added").html()
        checkContentItemsInBox = checkContentItemsInBox.trim(checkContentItemsInBox)

    let getTitleVariant = $(this).parents("li").attr("data-title")
    let getIdVariant = $(this).parents("li").attr("data-variant")
    let idProduct = $(this).parents("li").attr("data-product")
    let titleProduct =  $(".header-your-box h3.active").text()
        titleProduct = titleProduct.trim(titleProduct)

        if(checkContentItemsInBox == ''){
          $(".items-added").append(`
            <div class="item item-${idProduct}" data-title-prod="${titleProduct}" data-prod-id="${idProduct}" data-variant-id="${getIdVariant}">
              <div class="header-item">${titleProduct}</div>
              <div class="content" data-variant-id="${getIdVariant}">
                <p>${getTitleVariant}</p>
              </div>
            </div>
         `)
        }else{
          let checkIdProd
          let checkVariantId
          $( ".items-added .item" ).each(function( index ) {
            checkIdProd = $(this).attr("data-prod-id")
            checkVariantId = $(this).attr("data-variant-id")         
          });
            
          if(checkIdProd == idProduct){           
            let checkVariantContent 
            $( ".items-added .item .content" ).each(function( index ){
              checkVariantContent = $(this).attr("data-variant-id")
            });
            if(checkVariantContent != getIdVariant){
              $(`.items-added .item-${idProduct}`).append(`
              <div class="content" data-variant-id="${getIdVariant}">
                  <p>${getTitleVariant}</p>
                </div>
              `)
            }
          }else{
         
            $(".items-added").append(`
              <div class="item item-${idProduct}" data-title-prod="${titleProduct}" data-prod-id="${idProduct}" data-variant-id="${getIdVariant}">
                <div class="header-item">${titleProduct}</div>
                <div class="content" data-variant-id="${getIdVariant}">
                  <p>${getTitleVariant}</p>
                </div>
              </div>
          `)
          }
        }
  });

  /* LESS ITEMS */
  $(document).on("click", ".selected-qty .less", function () {
    let idToUpdate = $(this).attr("data-variant")
    let updateQty = $(`.qty-variant-${idToUpdate}`).text()      
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
      if(updateQty < 1){
        $(`.qty-variant-${idToUpdate}`).siblings(".less").addClass("disabled")
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
});
