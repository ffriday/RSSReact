import AstroItem from '@/components/content/AstroItem';
import { parseParam, getSearchParams } from '@/components/helpers/helpers';
import { ContentLayout, RootLayout, SearchLayout } from '@/components/layout';
import Search from '@/components/search/Search';
import {
  addSearch,
  getItem,
  getRunningQueriesThunk,
  wrapper,
} from '@/components/store';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export type THomeProps = {
  searchQuery: string;
  urlParams: Record<string, string>;
};

export const getServerSideProps: GetServerSideProps<THomeProps> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const search = parseParam(query.search);
    const urlParams = getSearchParams(query);
    store.dispatch(
      addSearch.initiate({
        query: search,
        size: urlParams.pageSize,
        page: urlParams.pageNumber,
      })
    );
    if(urlParams.uid) {
      store.dispatch(getItem.initiate({uid: urlParams.uid}))
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: { searchQuery: search, urlParams } };
  });

export default function HomeRoute({
  searchQuery,
  urlParams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <RootLayout>
      <SearchLayout>
        <Search searchQuery={searchQuery} urlParams={urlParams} />
      </SearchLayout>
      <ContentLayout>
        {urlParams.uid && <AstroItem uid={urlParams.uid}/>}
      </ContentLayout>
    </RootLayout>
  );
}
