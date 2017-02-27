/* globals $ */
/* eslint-env node, dirigible */

const PATH = "/applications";
const HTML_LINK = "../templates/applications.html";

//exports.getMenuItem = function() {
//	return {  
//      "name": "Applications",
//      "path": PATH,
//      "link": HTML_LINK
//   };
//};

exports.getSidebarItem = function() {
	return {  
      "name": "Applications",
      "path": PATH,
      "link": HTML_LINK
   };
};
