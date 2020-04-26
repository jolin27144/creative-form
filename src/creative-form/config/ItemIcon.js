export default (_self, h) => {
  let icons = [];
  // 修改按钮
  if (_self.obj.config && _self.obj.type !== "signature") {
    icons.push(
      h(
        "Button",
        {
          props: {
            value: "33",
            icon: "md-create"
          },
          on: {
            click() {
              _self.$emit("handleConfEle", {
                index: _self.index,
                id: _self.obj.label + _self.index
              });
            }
          }
        },
        "修改"
      )
    );
  }
  // 删除按钮
  icons.push(
    h(
      "Button",
      {
        props: {
          icon: "md-trash"
        },
        on: {
          click(e) {
            _self.$emit("handleRemoveEle", _self.index);
            e.stopPropagation();
          }
        }
      },
      "删除"
    )
  );
  return h(
    "div",
    {
      class: {
        "item-icon": true
      }
    },
    icons
  );
};
