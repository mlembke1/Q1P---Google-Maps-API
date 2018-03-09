const expect = chai.expect

describe('math', function () {
  it('is an object', function () {
    expect(math).to.be.a('object')
  })

  describe('fromKtoC', function () {
    it('should be a function', function () {
      expect(math.fromKtoC).to.be.a('function')
    })

    it('should convert K˚ to C˚', function () {
      expect(math.fromKtoC(281.15)).to.equal(8)
    })
  })

  describe('fromKtoF', function () {
    it('should be a function', function () {
      expect(math.fromKtoF).to.be.a('function')
    })

    it('should convert K˚ to F˚', function () {
      expect(math.fromKtoF(281.15)).to.equal(47)
    })
  })

})
