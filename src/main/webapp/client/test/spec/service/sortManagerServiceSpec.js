'use strict';

xdescribe('sortManagerServiceSpec', function () {
  var fromLocal, sortManagerService, sorts;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      sortManagerService = $injector.get('sortManagerService');
      fromLocal = $injector.get('fromLocal');
    });
    sorts = [
      {sid: '1', sname: '水果'},
      {sid: '2', sname: '饮料'}
    ];

  });

  it('it should getAllSorts', function () {
    spyOn(fromLocal, 'getData').and.returnValue(sorts);
    var allSorts = sortManagerService.getAllSorts();
    expect(allSorts.length).toBe(2);
    expect(fromLocal.getData.calls.count()).toBe(1);
  });

  it('it should be delete', function () {
    var sort = {sid:'1',sname:'水果'};
    spyOn(fromLocal, 'getData').and.returnValue(sorts);
    var afterDeleteSort = sortManagerService.delete(sort);
    expect(afterDeleteSort.length).toBe(1);
    expect(fromLocal.getData.calls.count()).toBe(1);
  });

  it('if the sort not in sorts ,it should not be deleted', function () {
    var sort = {sid:'3',sname:'服装'};
    spyOn(fromLocal, 'getData').and.returnValue(sorts);
    var afterDeleteSort = sortManagerService.delete(sort);
    expect(afterDeleteSort.length).toBe(2);
    expect(fromLocal.getData.calls.count()).toBe(1);
  });

  it('when to update,it should bring sid', function () {
    var sort = {sid:'1',sname:'水果'};
    var sid = sortManagerService.toUpdate(sort);
    expect(sid).toBe('1');
  });

  it('test get sort by id', function () {
    spyOn(fromLocal, 'getData').and.returnValue(sorts);
    var sort = sortManagerService.getSortById('1');
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(sort[0].sname).toBe('水果');
  });

  it('test the update', function () {
    spyOn(fromLocal, 'getData').and.returnValue(sorts);
    var sort = {sid:'1',sname:'服装'};
    var afterUpdateSort = sortManagerService.doUpdate(sort);
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(afterUpdateSort[0].sname).toBe('服装');
  });

  it('test the update failure', function () {
    spyOn(fromLocal, 'getData').and.returnValue(sorts);
    var sort = {sid:'3',sname:'服装'};
    var afterUpdateSort = sortManagerService.doUpdate(sort);
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(afterUpdateSort[0].sname).toBe('水果');
  });


});
