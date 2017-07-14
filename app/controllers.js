/*jslint node: true */
/*jslint nomen: true */
/*global angular, $, jQuery */
"use strict";

angular.module("gridApp.controllers", []).controller("GridController", function ($scope, $http) {

  $scope.config = {
    url: 'http://localhost:8090/controldelimites/macs',
    editurl: 'http://localhost:8090/controldelimites/macs',
    datatype: "jsonp",//local
    colNames: ['Id', 'Nombre', 'Dirección', 'Teléfono', 'Rut'],
    colModel: [
      { name: 'id', index: 'id', key: true, hidden: true },
      { name: 'nombre', index: 'nombre', editable: true },
      { name: 'direccion', index: 'direccion', editable: true },
      { name: 'telefono', index: 'telefono', editable: true },
      { name: 'rut', index: 'rut', editable: true }
    ],
    cmTemplate: { editable: true, autoResizable: true },
    iconSet: "fontAwesome",
    //styleUI: 'Bootstrap',
    rowList: [10, 20, 30],
    rowNum: 10,
    pager: '#pager',
    caption: "POC Angular-jqGrid",
    subGrid: true,
    subGridRowExpanded: function(subgrid_id, row_id) {
       var subgrid_table_id;
       subgrid_table_id = subgrid_id+"_t";
       jQuery("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table>");
       jQuery("#"+subgrid_table_id).jqGrid({
          url:"subgrid.php?q=2&id="+row_id,
          datatype: "xml",
          colNames: ['No','Item','Qty','Unit','Total'],
          colModel: [
            {name:"num",index:"num",width:80,key:true},
            {name:"item",index:"item",width:130},
            {name:"qty",index:"qty",width:80,align:"right"},
            {name:"unit",index:"unit",width:80,align:"right"},           
            {name:"total",index:"total",width:100,align:"right",sortable:false}
          ],
          height: '100%',
          rowNum:20,
          sortname: 'num',
          sortorder: "asc"
       });
   }
  };

});