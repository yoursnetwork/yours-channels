/* global describe,it */
'use strict'
let Msg = require('../../lib/msgs/msg')
let Random = require('yours-bitcoin/lib/random')
let should = require('should')

describe('Msg', function () {
  it('should exist', function () {
    should.exist(Msg)
    should.exist(new Msg())
  })

  describe('#setChanId', function () {
    it('should set the chanId', function () {
      let chanId = Random.getRandomBuffer(16).toString('hex')
      let msg = new Msg()
      msg.setChanId(chanId)
      msg.chanId.should.equal(chanId)
    })
  })

  describe('#getChanId', function () {
    it('should get the chanId', function () {
      let chanId = Random.getRandomBuffer(16).toString('hex')
      let msg = new Msg()
      msg.setChanId(chanId)
      msg.getChanId().should.equal(chanId)
    })
  })

  describe('#toJSON', function () {
    it('should convert this msg into json', function () {
      let msg = new Msg('command-name', ['arg1', 'arg2'])
      let json = msg.toJSON()
      json.cmd.should.equal('command-name')
      json.args[0].should.equal('arg1')
      json.args[1].should.equal('arg2')
    })
  })

  describe('#fromJSON', function () {
    it('should convert this json into a msg', function () {
      let msg = Msg.fromJSON({
        cmd: 'command-name',
        args: ['arg1', 'arg2'],
        chanId: Random.getRandomBuffer(16).toString('hex')
      })
      msg.cmd.should.equal('command-name')
      msg.args[0].should.equal('arg1')
      msg.args[1].should.equal('arg2')
    })
  })

  describe('#isValid', function () {
    it('should know this is a valid msg', function () {
      let msg = new Msg('command-name', ['arg1', 'arg2'])
      msg.isValid().should.equal(true)
    })
  })
})
