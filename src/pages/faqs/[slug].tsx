import Head from 'next/head'
import Link from 'next/link'

import { getAllFaqsIds, getFaqData } from 'lib/faqs'

import * as S from './styles'
import React from 'react'

type PostDataProps = {
  postData: {
    title: string
    contentHtml: string
  }
}

type ParamsProps = {
  params: {
    slug: string
  }
}

export default function Post({ postData }: PostDataProps) {
  return (
    <S.Wrapper>
      <S.Logo
        src="/img/logo.svg"
        alt="Imagem de um átomo e React Avançado escrito ao lado."
      />
      <Head>
        <title>{postData.title}</title>
      </Head>
      <S.ArticleWrapper>
        <Link href="/">
          <a>Voltar</a>
        </Link>

        <S.Title>{postData.title}</S.Title>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </S.ArticleWrapper>
    </S.Wrapper>
  )
}

export async function getStaticPaths() {
  const paths = getAllFaqsIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: ParamsProps) {
  const postData = await getFaqData(params.slug)

  return {
    props: {
      postData
    }
  }
}