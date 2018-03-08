const expect = chai.expect

describe('math', function () {
  it('is an object', function () {
    expect(math).to.be.a('object')
  })

  describe('fromKtoF', function () {
    it('should be a function', function () {
      expect(math.fromKtoF).to.be.a('function')
    })

    it('should convert K˚ to F˚', function () {
      expect(math.fromKtoF(10)).to.equal(-441)
    })
  })

  describe('fromKtoC', function () {
    it('should be a function', function () {
      expect(math.fromKtoC).to.be.a('function')
    })

    it('should convert K˚ to C˚', function () {
      expect(math.fromKtoC(10)).to.equal(-263)
    })
  })

    describe('fromKtoR', function () {
      it('should be a function', function(){
        expect(math.fromKtoR).to.be.a('function')
      })
      it('should convert K˚ to C˚', function(){
        expect(math.fromKtoR(10)).to.equal(18)
      })
    })
  })
