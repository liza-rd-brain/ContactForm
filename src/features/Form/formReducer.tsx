import { ActionType, FormState } from "../../types";

export const formReducer = (
  state: FormState,
  action: ActionType
): FormState => {
  switch (action.type) {
    case "addFormItem": {
      const upperElementIndex = action.itemIndex;
      const formItemList = state.formItemList;

      const partBeforeNewItem = formItemList.slice(0, upperElementIndex + 1);
      const partAfterNewItem = formItemList.slice(upperElementIndex + 1);

      const newFormItem = {
        ...formItemList[upperElementIndex],
        id: state.counterId,
      };

      const newformItemList = [
        ...partBeforeNewItem,
        newFormItem,
        ...partAfterNewItem,
      ];

      return {
        ...state,
        formItemList: newformItemList,
        counterId: state.counterId + 1,
      };
    }

    case "deleteFormItem": {
      const currElIndex = action.itemIndex;
      const newformItemList = state.formItemList.filter(
        (formItem, itemIndex) => {
          return itemIndex !== currElIndex;
        }
      );

      return {
        ...state,
        formItemList: newformItemList,
      };
    }

    case "changeSelect": {
      //TODO: Clear input after changing select?
      const { type: newType, itemIndex } = action.payload;

      const newformItemList = state.formItemList.map(
        (formItemElem, elemIndex) => {
          if (elemIndex === itemIndex) {
            return { ...formItemElem, type: newType };
          } else return formItemElem;
        }
      );

      const newState = {
        ...state,
        formItemList: newformItemList,
      };

      return newState;
    }

    case "changeInput": {
      const { value: newValue, itemIndex } = action.payload;

      const newformItemList = state.formItemList.map(
        (formItemElem, elemIndex) => {
          if (elemIndex === itemIndex) {
            return { ...formItemElem, value: newValue };
          } else {
            return formItemElem;
          }
        }
      );

      return {
        ...state,
        formItemList: newformItemList,
      };
    }

    default: {
      return state;
    }
  }
};
