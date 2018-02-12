import Vue from 'vue';
import SignUp from '@/components/SignUp';

const simulateClick = (selector, vm) => {
  const element = vm.$el.querySelector(selector);
  const clickEvent = new window.Event('click');
  element.dispatchEvent(clickEvent);
  vm._watcher.run(); // eslint-disable-line no-underscore-dangle
};

const fillField = (selector, value, vm) => {
  const element = vm.$el.querySelector(selector);
  element.setAttribute('value', value);
  vm._watcher.run(); // eslint-disable-line no-underscore-dangle
}

describe('SignUp.vue', () => {
  describe('Form fields', () => {
    let vm = null;
    beforeEach(() => {
      const Constructor = Vue.extend(SignUp);
      vm = new Constructor().$mount();
    });
    it('should have a username field', () => {
      expect(vm.$el.querySelector('.signup__username'))
        .not.to.equal(null);
    });

    it('should have a password field', () => {
      expect(vm.$el.querySelector('.signup__password'))
        .not.to.equal(null);
    });

    it('should have submit button', () => {
      expect(vm.$el.querySelector('.signup__submit'))
        .not.to.equal(null);
    });
  });

  describe('Submit', () => {
    let vm = null;
    let authStub = null;
    beforeEach(() => {
      authStub = {
        createUserWithEmailAndPassword: sinon.stub(),
      };
      authStub.createUserWithEmailAndPassword.resolves(true);
      const Constructor = Vue.extend(SignUp);
      vm = new Constructor({
        propsData: {
          firebaseAuth: authStub,
        },
      }).$mount();
    });
    it('should call signup method', () => {
      const spy = sinon.spy(vm, 'onSignup');
      simulateClick('.signup__submit', vm);
      expect(spy.calledOnce).to.equal(true);
    });

    it('should call firebase createUserWithEmailAndPassword', () => {
      vm.signUpModel.username = 'jimbo@example.com';
      vm.signUpModel.password = 'Squirrel1234';
      simulateClick('.signup__submit', vm);
      expect(authStub.createUserWithEmailAndPassword.calledWith('jimbo@example.com', 'Squirrel1234')).to.equal(true);
    });
  });
});
