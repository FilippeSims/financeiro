<template>
  <q-page>
    <div class="q-pa-md doc-container">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" to="/sistema" />
    </q-breadcrumbs>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-card class="balance-dash q-mt-md">
            <q-card-section>
              <h5>Saldo total</h5>
              <h4>R$ 0,00</h4>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="balance-dash q-mt-md">
            <q-card-section>
              <h5>Lançamentos Pagos</h5>
              <h4>R$ 0,00</h4>
              <q-btn dense color="primary" class="q-mt-xs" label="Ver detalhes"/>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="balance-dash q-mt-md">
            <q-card-section>
              <h5>Pagamentos futuros</h5>
              <h4>R$ 0,00</h4>
              <q-btn dense color="primary" class="q-mt-sm" label="Ver detalhes"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-col-gutter-sm">
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
}
</script>
