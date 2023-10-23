import 'mocha' ;
import 'mocha/mocha.css';
import {expect} from 'chai';
import App from './expressApp.js'

mocha.setup('bdd');

describe('test', () => {
  it('passes', async () => {
    expect(1).to.eql(1);
  });
  it('makes express app'), async ()=>{
    const app = App();
    expect(app).not.to.be(null);
  }
  
});

mocha.run();
