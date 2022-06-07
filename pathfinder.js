document.addEventListener("DOMContentLoaded", function(event) {
      //your code to run since DOM is loaded and ready
      console.log("document ready");

      // document.querySelectorAll('div[type=UIWindow]')

      var statusBarWindow = document.querySelectorAll('div[type=UIStatusBarWindow]')[0]
      statusBarWindow.style.visibility = "hidden";

    });

    function parents(node) {
      var nodes = [node]
      for (; node; node = node.parentNode) {
        nodes.unshift(node)
      }
      return nodes
    }

    function commonAncestor(node1, node2) {
      var parents1 = parents(node1)
      var parents2 = parents(node2)

      if (parents1[0] != parents2[0]) throw "No common ancestor!"

      for (var i = 0; i < parents1.length; i++) {
        if (parents1[i] != parents2[i]) return parents1[i - 1]
      }
    }

    function getChildNumber(node) {
      var  i= 0;
      while((node=node.previousElementSibling)!=null) ++i;
      return i;

      // console.log("getChildNumber: ", node);
      // console.log("node.parentNode.childNodes: ", node.parentNode.childNodes);
      // return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
    }

    function reverseString(s){
      return s.split("").reverse().join("");
    }

    function getPathUpToElement(common, startNode) {
      var path = "";
      var current = startNode;
      while (current != common) {

        var number = getChildNumber(current)
        console.log("number: ", number);
        path = path+"."+number;
        current = current.parentElement;
      }
      path = path.substr(1);
      console.log("path: ", path);
      //remove first .
      return path;
    }

    function clicked(event) {
      // document.body.textContent =
      //   "clientX: " + event.clientX +
      //   " - clientY: " + event.clientY;

        console.log("click x: ", event.clientX, " click y: ", event.clientY);

        var element = document.elementFromPoint(event.clientX, event.clientY);

        // console.log("element is: ", element);

        var realElement = element;

        while (!realElement.hasAttribute("c")) {
          realElement = realElement.parentElement;
          if (realElement == null) {
            console.log("clicked somewhere lame");
            return;
          }
        }
        // console.log("realElement is: ", realElement);
        // console.log("realElement is: ", realElement.attributes.type);
        // console.log("realElement is: ", realElement.attributes.view_controller);

        if (window.firstElement == null) {
          window.firstElement = realElement;
          console.log("chose element to select");
        } else if (window.secondElement == null) {
          window.secondElement = realElement;

          console.log("chose trigger element");
          console.log("selected element: ", window.firstElement, " trigger element:", window.secondElement);

          //from the second element, find the first element

          var common = commonAncestor(window.firstElement, window.secondElement);
          console.log("common: ", common);

          //find how to get to common from the second element
          // var number = getChildNumber(window.secondElement)
          // console.log("number: ", number);

          var secondPath = getPathUpToElement(common, secondElement);
          var firstPath = getPathUpToElement(common, firstElement);
          // console.log("path: ", path);

          var path = secondPath + "*" + reverseString(firstPath);
          console.log("path: ", path);
          var basedOnText = secondElement.outerText;
          console.log("basedOnText: ", basedOnText);

          var result = {view_class:window.firstElement.getAttribute("c"),based_on_view:{path:path, conditions:{view_class:window.secondElement.getAttribute("c")}}};

            if (window.secondElement.innerText){
            result.based_on_view.conditions.contains_text = window.secondElement.innerText;
            }

          console.log("result: ", JSON.stringify(result));

          window.firstElement = null;
          window.secondElement = null;
        }

        // window.f = realElement;

        // a = new CSSOptimumSelector.default(f)

    }

    document.addEventListener("click", clicked);