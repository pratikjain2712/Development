/* Author: Pratik*/
$(document).ready(function(){
  var ItemsArray = [];
  var selectedIndex = -1;
  function init() {
    document.getElementById("list").innerHTML = "";
    if (localStorage.itemRecord) {
        ItemsArray = JSON.parse(localStorage.itemRecord);
        for (var i = 0; i < ItemsArray.length; i++) {
            prepareTableCell(i, ItemsArray[i].itemname, ItemsArray[i].itemqty);
        }
      $('#item').val("");
      $('#qty').val("");
    }
  }
  init();
  $('.btn').on('click',function(){
    addval($('#item'),$('#qty'));
  });//add row on click of save button
  $('#clear').on('click',onClearPressed); //remove all rows
  $("img[src*='delete']").on('click',deleterow); //to delete a row
  $("img[src*='modify']").on('click',editrow); //to modify a row
  function addval(Name,Qty){
    var itemName = Name.val(),
    itemQty = Qty.val(),
    itmObj = {itemname: itemName, itemqty: itemQty};
    console.log(ItemsArray[0]);
    if (selectedIndex === -1) {
        ItemsArray.push(itmObj);
    } else {
        ItemsArray.splice(selectedIndex, 1, itmObj); 
    }
    localStorage.itemRecord = JSON.stringify(ItemsArray);
    init();
  }
  // function updateval(){
  //   var itemName = $('#editnamefield').val(),
  //   itemQty = $('#editqtyfield').val(),
  //   itmObj = {itemname: itemName, itemqty: itemQty};
  //   if (selectedIndex === -1) {
  //       ItemsArray.push(itmObj);
  //   } else {
  //       ItemsArray.splice(selectedIndex, 1, itmObj);
  //   }
  //   localStorage.itemRecord = JSON.stringify(ItemsArray);
  //   init();
  // }

  function prepareTableCell(index, name, qty) {
    var table = document.getElementById("list"),
    row = table.insertRow(),//to add a row in table each time
    itemNameCell = row.insertCell(0),
    itemQtyCell = row.insertCell(1),
    itemModify = row.insertCell(2),
    itemDelete = row.insertCell(3);
    itemNameCell.innerHTML = name;
    itemQtyCell.innerHTML = qty;
    itemModify.innerHTML = '<img src="assets/images/modify.png" alt="modify image" data-index='+index+' />';
    itemDelete.innerHTML = '<img src="assets/images/delete.png" alt="delete image" data-index='+index+' />';
  }

  function editrow(){
    $(this).text('Update');
    index = $(this).attr('data-index');
    selectedIndex = index;
    var itmObj = ItemsArray[index];
    var inputqtystring = "<input type='number' id='editqtyfield'>",
    $inputqtystring = $(inputqtystring);
    $inputqtystring.attr('value',itmObj.itemqty);
    $(this).parent().prev().html($inputqtystring);
    $('#editnamefield').on('blur',function(){
     addval($('#editnamefield'),$('#editqtyfield'));
    });

    var inputnamestring = "<input type='text' id='editnamefield'>";
    var $inputnamestring = $(inputnamestring);
    $inputnamestring.attr('value',itmObj.itemname);
    $(this).parent().prev().prev().html($inputnamestring);
    $('#editqtyfield').on('blur',function(){
     addval($('#editnamefield'),$('#editqtyfield'));
    });
    // $('#item').val(itmObj.itemname);
    // $('#qty').val(itmObj.itemqty);
    // $('#save').on('click',updateval);
  }

  function deleterow(){
    index = $(this).attr('data-index');
    ItemsArray.splice(index, 1);//splice the current value
    localStorage.itemRecord = JSON.stringify(ItemsArray);//convert it to string
    init();
  }

  function onClearPressed() {
    ItemsArray.length = 0;//force array to get empty
    localStorage.itemRecord = JSON.stringify(ItemsArray);
    init();
  }
});
