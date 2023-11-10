import { config } from 'dotenv';

import { expect } from 'chai';
import { describe, beforeEach, afterEach, it } from 'mocha';
import { SinonStub, stub } from 'sinon';

import { get } from '../../api/route/Article/article.get';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../api/constant/code';
import { getClient } from '../../api/database';

config();

describe('"article.get" route', () => {
  const scrapyApiKey = process.env.SCRAPY_API_KEY;
  const rewriterApiKey = process.env.REWRITER_API_KEY;

  let res: any;
  let req: any;

  beforeEach(() => {
    req = {
      params: {
        id: 1,
      },
    };

    res = {
      json: stub(),
      status: stub(),
    };
  });

  afterEach(() => {
    res.json.restore();
    res.status.restore();
  });

  it('should return a document when a valid ID is provided', () => {
    const fakeResult = {
      rows: [
        {
          id: 1,
          name: 'Name of the article',
          author: 'Someone',
          body: ["Paragraph 1", "Paragraph 2", "Paragraph 3"],
          category: 'world',
          source_url: 'http://example.com',
          cover_url: 'http://example.com/cover.jpg',
          retrieved_date: new Date(),
          publication_date: new Date(),
          image_gen: 'http://example.com/image.jpg',
        },
      ],
    };
    const getClientStub: SinonStub = stub(getClient(), 'query').yields(null, fakeResult);

    get(req, res);

    expect(res.status.calledWithExactly(200)).to.be.true;
    expect(res.json.calledWithExactly(fakeResult.rows[0])).to.be.true;

    getClientStub.restore();
  });

  it('should return a 400 status and an error message when no ID is provided', () => {
    req.params.id = 2;

    get(req, res);

    expect(res.status.calledWithExactly(BAD_REQUEST)).to.be.true;
    expect(res.json.calledWithExactly({
      message: 'Document id is required',
      type: 'QueryError',
    })).to.be.true;
  });

  it('should return a 500 status and an error message when a database error occurs', () => {
    const databaseError = new Error('Simulated database error');
    const getClientStub: SinonStub = stub(getClient(), 'query').yields(databaseError, null);

    get(req, res);

    expect(res.status.calledWithExactly(INTERNAL_SERVER_ERROR)).to.be.true;
    expect(res.json.calledWithExactly({
      message: 'Simulated database error',
      type: 'DatabaseError',
    })).to.be.true;

    getClientStub.restore();
  });
});
