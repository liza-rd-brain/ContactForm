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
      const currId = action.itemId;
      const newformItemList = state.formItemList.filter((formItem) => {
        const { id } = formItem;
        return id !== currId;
      });

      return {
        ...state,
        formItemList: newformItemList,
      };
    }

    case "changeSelect": {
      //TODO: Clear input after changing select?
      const { type: newType, id } = action.payload;

      const newformItemList = state.formItemList.map((formItemElem) => {
        if (formItemElem.id === id) {
          return { ...formItemElem, type: newType };
        } else return formItemElem;
      });

      const newState = {
        ...state,
        formItemList: newformItemList,
      };

      return newState;
    }

    case "changeInput": {
      const { value: newValue, id: currId } = action.payload;

      const newformItemList = state.formItemList.map((formItem) => {
        const { id } = formItem;

        if (id === currId) {
          return { ...formItem, value: newValue };
        } else {
          return formItem;
        }
      });

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
