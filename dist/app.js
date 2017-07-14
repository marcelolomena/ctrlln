/*jslint node: true */
/*jslint nomen: true */
/*global angular, _ */
"use strict";

angular.module("gridApp", [
  'gridApp.directives',
  'gridApp.controllers'
]);;/*jslint node: true */
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

});;/*jslint node: true */
/*global angular, $, jQuery */

"use strict";

angular.module("gridApp.directives", []).directive("ngJqGrid", function () {
  var directive = {};
  directive.restrict = 'E';

  directive.scope = {
    config: '=',
    data: '=',
  };
  //directive.templateUrl = "app/templates/grid.html";
  directive.link = function (scope, element, attr) {
    var table, pager;

    scope.$watch('config', function (newValue) {

      element.children().empty();
      table = angular.element('<table id=\'grid\'></table>');
      pager = angular.element('<div id=\'pager\'></div>');
      element.append(table);
      element.append(pager);

      $(table).jqGrid(newValue).jqGrid('navGrid', "#pager", {
        edit: true, add: true, del: true, search: false,
        refresh: true, view: true, position: "left", cloneToTop: false
      },
        {
          editCaption: "Modifica Dato",
          closeAfterEdit: true,
          recreateForm: true,
          ajaxEditOptions: {
            type: "POST",
            contentType: "application/json; charset=utf-8",
          },
          serializeEditData: function (postdata) {
            return JSON.stringify(postdata);
          },
          errorTextFormat: function (data) {
            return 'Error: ' + data.responseText;
          }, beforeSubmit: function (postdata, formid) {

            return [true, "", ""];

          }, afterSubmit: function (response, postdata) {
            var json = response.responseText;
            return [true, "", ""];
          }, beforeShowForm: function (form) {

          }
        },
        {
          addCaption: "Agrega Dato",
          closeAfterAdd: true,
          recreateForm: true,
          ajaxEditOptions: {
            type: "POST",
            contentType: "application/json; charset=utf-8",
          },
          serializeEditData: function (postdata) {
            if (postdata.id === '')
              postdata.id = 0;
            return JSON.stringify(postdata);
          },
          errorTextFormat: function (data) {
            return 'Error: ' + data.responseText;
          }, beforeSubmit: function (postdata, formid) {
            return [true, "", ""];
          }, afterSubmit: function (response, postdata) {
            var json = response.responseText;

            return [true, "", ""];
          }, beforeShowForm: function (form) {

          }
        },
        {
          ajaxDelOptions: {
            contentType: "application/json; charset=utf-8",
          },
          serializeDelData: function (postdata) {
            return JSON.stringify(postdata);
          },
          errorTextFormat: function (data) {
            return 'Error: ' + data.responseText;
          }, afterSubmit: function (response, postdata) {
            var json = response.responseText;
            return [true, "", ""];
          }
        },
        {
          recreateFilter: true
        }
      )
        .jqGrid("filterToolbar")
        .jqGrid("gridResize");

    });

  };

  return directive;
}).directive('showtab',
  function () {
    return {
      link: function (scope, element, attrs) {
        element.bind('click', function(e) {
          e.preventDefault();
          $(element).tab('show');
        });
      }
    };
  });;angular.module('templates-dist', ['../app/templates/grid.html']);

angular.module("../app/templates/grid.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("../app/templates/grid.html",
    "<table id=\"tabs\"></table>\n" +
    "<div id=\"paginator\"></div>");
}]);
