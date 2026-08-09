with open("tests/instant-responder-demo.spec.ts", "r") as f:
    content = f.read()

import re

old = """  test.beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });"""

new = """  test.beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
    rateMemory.clear();
  });"""

content = content.replace(old, new)

with open("tests/instant-responder-demo.spec.ts", "w") as f:
    f.write(content)
