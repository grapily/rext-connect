REPODIR = test/repo
SRC = lib/rest-connect.js

$(REPODIR):
	mkdir -p $(REPODIR)
    
test-server: $(REPODIR)
	@node test/server
