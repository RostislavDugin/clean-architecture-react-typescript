import BaseView from '../view/BaseView';

export default interface BaseViewModel {
  attachView(baseView: BaseView): void;
  detachView(): void;
}
