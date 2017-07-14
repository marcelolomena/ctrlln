/*jslint node: true */
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
  });