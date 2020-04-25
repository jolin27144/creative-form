export default (_self, h) => {
  let icons = [];
  // 修改按钮
  if (_self.obj.config) {
    icons.push(
      h("Icon", {
        props: {
          type: "gear-a",
          value: "33"
        },
        nativeOn: {
          click() {
            _self.$emit("handleConfEle", {
              index: _self.index,
              id: _self.obj.label + _self.index
            });
          }
        },
        domProps: {
          innerHTML: "修改"
        }
      })
    );
  }
  // 删除按钮
  icons.push(
    h("Icon", {
      props: {
        type: "trash-a"
      },
      nativeOn: {
        click(e) {
          _self.$emit("handleRemoveEle", _self.index);
          e.stopPropagation();
        }
      },
      domProps: {
        innerHTML: "删除"
      }
    })
  );
  const item_icon = h(
    "div",
    {
      class: {
        "item-icon": true
      }
    },
    icons
  );
  return item_icon;
};
